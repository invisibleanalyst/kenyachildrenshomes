// Local-only event adapter. No network, storage, STK prompt or personal data.
export const initialPayment = {status:'idle',attempt:0,confirmedAttempt:null,confirmationCount:0};
export function paymentReducer(state,event){
 if(event.type==='start' && !['pending','confirmed'].includes(state.status))return {...state,status:'pending',attempt:state.attempt+1};
 if(event.type==='result' && state.status==='pending' && event.attempt===state.attempt && ['confirmed','cancelled','failed','timed-out'].includes(event.status)){
  return {...state,status:event.status,confirmedAttempt:event.status==='confirmed'?state.attempt:state.confirmedAttempt,confirmationCount:state.confirmationCount+(event.status==='confirmed'?1:0)};
 }
 return state;
}
