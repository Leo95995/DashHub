import * as express from "express";

import { GithubController } from "../../Controllers/github-controller";

const github_router = express.Router();



github_router.get("/trending_repos", GithubController.get_trending_repos );
github_router.get("/repo_trend", GithubController.get_repo_trend );
github_router.get("/user_activity", GithubController.get_user_activity );
github_router.get("/random-user", GithubController.get_random_user );




export default github_router;


