import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import './IsLoading.css';


const Loading = props => {
  return (
    <div className= 'loaderHolder'>
      <div className="loaderMain">
        <Loader type="Bars" color="#de352c" height={80} width={80} />
        <div style={{ textAlign: 'center', whiteSpace: 'pre' }}>
          {props.message}
        </div>
      </div>
    </div>
  );
};

 const IsLoadingHOC = ( WrappedComponent, loadingMessage ) => {
  function HOC ( props ) {
    const [isLoading, setLoading] = useState( false );

    const setLoadingState = isComponentLoading => {
      setLoading( isComponentLoading );
    };

    return (
      <>
        {isLoading && <Loading message={loadingMessage} />}
        <WrappedComponent {...props} isLoading = {isLoading} setLoading={setLoadingState} />
      </>
    );
  }
  return HOC;
};

export default IsLoadingHOC;
