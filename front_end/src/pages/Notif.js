import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const style = {
  height: 30,
  border: '1px solid green',
  margin: 6,
  padding: 8,
};

export default function Notif() {
  const [state, setState] = useState(Array.from({ length: 20 }));

  const fetchMoreData = () => {
    console.log('????????????????');
    // return <div style={style}>div</div>;
    setTimeout(() => {
      setState(state.concat(Array.from({ length: 20 })));
    }, 1500);
  };

  return (
    <div style={{ height: '50px' }}>
      <h1>demo: react-infinite-scroll-component</h1>
      <hr />
      <InfiniteScroll
        dataLength={state.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {state.map((i, index) => (
          <div style={style} key={index}>
            div - #{index}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
