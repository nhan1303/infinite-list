import React from "react";

import { InfiniteList } from "@components";
import { ILoadMoreItemProps } from "@components/VirtualList";
import UserItem from "@features/users/components/Item";

export interface IListProps {
  data: any[];
  onLoadMore?: () => void;
  isFetching?: boolean;
}

export const List: React.FC<IListProps> = ({
  data,
  onLoadMore,
  isFetching,
}) => {
  const generateUserItem = React.useCallback((item: any, index: number) => {
    return <UserItem key={index} user={item} index={index} />;
  }, []);

  const generateLoadMoreItem = React.useCallback(({}: ILoadMoreItemProps) => {
    const loaderHeight = 50;
    return (
      <div
        style={{
          backgroundColor: "green",
          height: loaderHeight,
          lineHeight: `${loaderHeight}px`,
          textAlign: "center",
        }}
      >
        Load more...
      </div>
    );
  }, []);
  return (
    <div className="user-list" style={{ width: 800 }}>
      <InfiniteList
        data={data}
        itemHeight={90}
        viewportHeight={450}
        onLoadMore={onLoadMore}
        preloadItemCount={10}
        isFetching={isFetching}
        onRenderItem={generateUserItem}
        loadMoreItem={generateLoadMoreItem}
      />
    </div>
  );
};

export default React.memo(List);
