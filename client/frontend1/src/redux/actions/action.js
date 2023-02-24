import { ActionType } from "../contants/actionType";

export const setFundrs = (fundraisers) =>  {
       return {
            type : ActionType.SET_FUNDRS,
            payload : fundraisers
       };
};

export const setFundr = (fundraiser) =>  {
    return {
         type : ActionType.SET_FUNDR,
         payload : fundraiser
    };
};

export const setAuth = (profile) =>  {
     return {
          type : ActionType.SET_FUNDR,
          payload : profile
     };
 };