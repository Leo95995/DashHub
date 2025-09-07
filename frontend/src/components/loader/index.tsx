import styled, { keyframes } from "styled-components";

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
    border-top: 3px solid #fff;
    border-right: 3px solid transparent;
    box-sizing: border-box;
    animation: ${key} 1s linear infinite;
  }
`;

interface IReactLoaderProps {
  onLoad?: (action: any) => any;
}

const ReactLoader: React.FC<IReactLoaderProps> = () => {
  return (
    <Loader>
      <div className="loader" />
    </Loader>
  );
};

export default ReactLoader;
