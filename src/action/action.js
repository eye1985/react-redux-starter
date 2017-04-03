export const ACTION_TYPE = 'EXAMPLE';

export function action(payload){
    return {
        type: ACTION_TYPE,
        payload
    }
}
