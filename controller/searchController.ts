import { controller } from "./insertController"

import { view } from "../view/view"

class SearchController {

    async search(request: any, response: any) {
        try {
            console.log('processId:--',process.pid);
            
            let data = await view.searchPolicyInfo(request.query.search)
            response.send(data)
        } catch (error) {
            throw error
        }
    }

    async aggregatePolicyOfUser(request: any, response: any) {
        try {
            let data = await view.aggregatePolicyOfUser()
            response.send(data)
        } catch (error) {
            throw error
        }
    }
}
export const searchController = new SearchController()