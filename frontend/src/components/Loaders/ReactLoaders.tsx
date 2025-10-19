import styled, { keyframes } from "styled-components";
import type { IReactLoaderProps } from "./types";

const key = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const Loader = styled.div`
  .loader {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: inline-block;
    border-top: 3px solid;
    border-right: 3px solid transparent !important;
    box-sizing: border-box;
    animation: ${key} 1s linear infinite;
  }
`;

const ReactLoader: React.FC<IReactLoaderProps> = () => {
  return (
    <Loader>
      <div className="loader dark:border-t-3 dark:border-white border-black" />
    </Loader>
  );
};

export default ReactLoader;
