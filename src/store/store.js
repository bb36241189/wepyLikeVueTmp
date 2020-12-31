/**
 * Created by Administrator on 2018/9/13 0013.
 */
import apiService from '../js/apiService';
import eventHub from '../common/eventHub';
export default {
    state : {
        text : null,
    },
    mutations : {
        changeText(state,v){
            state.text = v;
        }
    },
    done(scope){
        eventHub.$on('$store:change',scope['$store:change:eventHandler'] = (v) => {
            Object.assign(scope.$store.state,v);
            Object.assign(this.state,v);
            // console.log('eventBus:$store:change',scope.$store)
        });
    },
    disDone(scope){
        eventHub.$off('$store:change',scope['$store:change:eventHandler']);
    },
    commit(k,v){
        if(this.mutations[k]){
            this.mutations[k](this.state,v);
            eventHub.$emit('$store:change',this.state);
        }
    },
    dispatch(k,v){
        if(this.actions[k]){
            this.actions[k]({commit: this.commit.bind(this)},v);
        }
    },
    getters : {
        doubleCount : state => {
            return state.count * 2;
        }
    },
    actions: {
        loadStarInfo({commit},starKey){
            return apiService.getStarInfo(starKey).then(ret => {
                commit('changeStarInfo',ret);
            }).catch(e => {
                console.error(e);
            })
        },
        login({commit}){
            return apiService.tokenLogin().then(ret => {
                if(!ret.code){
                    commit('changeUserInfo',ret);
                }else{
                    return Promise.reject(ret);
                }
            }).catch(e => {
                if(e.code && e.code == 103){
                    wx.removeStorageSync('token')
                    delete apiService.token;
                }else{
                    console.error(e);
                }
            })
        }
    }
};