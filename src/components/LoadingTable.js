import * as React from 'react';
import { SyncLoader } from "react-spinners";

const LoadingTable = (props) => {
  let {isLoading, tdCount = 7} = props;
  if(isLoading){
    return (
      <tbody>
        <tr className="text-center">
          <td className="text-center" colSpan={tdCount}>
            <SyncLoader color={"#4F81BC "} loading={true} /> 
          </td>
        </tr>
      </tbody>
    );
  }
  return false;
}

export default LoadingTable;