// Jest
import { describe, it, expect } from "@jest/globals";
// Fn
import { populateGithubPiechart } from "../../src/utils/github-utils";
// Chart data
import { GithubData } from "../../src/features/dashboard/components/Widgets/GithubWidget/types";


const data : GithubData['object'] = {}


describe("Populate Github Piechart", () => {
  it("Should return the data to generate a piechart ", () => {

   const res  = populateGithubPiechart(data, 'Testing')
   expect(res.result.datasets[0].label).toBe('Testing')
   expect(res.result.datasets[0].borderColor).toBeDefined()
   expect(res.result.datasets[0].backgroundColor).toBeDefined()
   

  });
});
