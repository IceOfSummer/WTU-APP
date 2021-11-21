type ajaxConfig = {
    url: string
    method?: method,
    data?: Object | string,
    rejectPolicy?: rejectPolicy
}

type rejectPolicy = 'REJECT_IF_EXIST' | 'CANCEL_OLD_TASK' | 'NO_POLICY'
type method = 'GET' | 'POST' | undefined


export function noRepeatAjax (url: string, method?: method, data?: object): Promise<unknown>
export function cancelOldAjax(url: string, method?: method, data?: object): Promise<unknown>
