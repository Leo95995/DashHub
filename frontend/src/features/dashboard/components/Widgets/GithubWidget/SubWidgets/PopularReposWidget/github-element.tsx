import PieChart from "./components/PieChart";
import { populateGithubPiechart } from "../../../../../../../utils/github-utils";
import type { GithubData } from "../../interfaces/interface";

const GithubElement: React.FC<GithubData> = ({ object }) => {
  if (!object) {
    return <> No Data available for this repository</>;
  }

  // For now it is handled here.
  const data = populateGithubPiechart(object, "Byte written");
  return (
    <>
      {data.result.labels.length < 0 ? (
        <>
          <div>NO data</div>
        </>
      ) : (
        <PieChart data={data} />
      )}
    </>
  );
};

export default GithubElement;
