import 'vuex';
import * as Task from '~/store/task/type';

declare module 'vuex' {
  type Getters<S, G> = {
    [K in keyof G]: (
      state: S, getters?: G, rootState?: RouteState, rootGetters?: RouteGetters
    ) => G[K];
  }

  type RouteState = Task.S;
  type RouteGetters = Task.RG;
  type RouteMutations = Task.RM;

  type Mutations<S, M> = {
    [K in keyof M]: (state: S, payload: M[K]) => void;
  }

  type ExCommit<M> = <T extends keyof M>(type: T, payload?: M[T]) => void;
  type ExDispatch<A> = <T extends keyof A>(type: T, payload?: A[T]) => any;
  type ExActionContext<S, A, G, M, RS, RG> = {
    commit: ExCommit<M>;
    dispatch: ExDispatch<A>;
    state: S;
    getters: G;
    rootState: RouteState;
    rootGetters: RouteGetters;
  }

  type Actions<S, A, G = {}, M = {}, RS = {}, RG = {}> = {
    [K in keyof A]: (ctx: ExActionContext<S, A, G, M, RS, RG>, payload: A[K]) => any;
  }

  interface ExStore extends Store<RouteState> {
    getters: RouteGetters;
    commit: ExCommit<RouteMutations>;
  }
}