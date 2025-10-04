import type { GithubWidgets} from "../../features/dashboard/components/widgetSwitcher/types"
import { storage } from "./storage"

const GITHUB_KEY = "github" 

const githubKey =  {
    getSelectedWidget: ()=> {
        return storage.getItem(`${GITHUB_KEY}_selected`)
    },
    setSelectedWidget: (selectedWidget: GithubWidgets )=> {
        storage.setItem(`${GITHUB_KEY}_selected`, selectedWidget)
    }

}

export default githubKey