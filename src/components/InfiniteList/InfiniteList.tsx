import React from "react";
import { VirtualList, ILoadMoreItemProps } from "@components/VirtualList";

export interface IInfiniteListProps {
  data: any[];
  itemHeight: number;
  onRenderItem: (item: any, index: number) => React.ReactNode;

  onLoadMore?: () => void;
  preloadItemCount?: number;
  viewportHeight?: number;
  isFetching?: boolean;
  loadMoreItem?:
    | React.ReactNode
    | ((props: ILoadMoreItemProps) => React.ReactNode | JSX.Element);
}

export const InfiniteList: React.FC<IInfiniteListProps> = (props) => {
  return (
    <div className="infinite-list">
      <VirtualList {...props} onBottomReached={props?.onLoadMore} />
    </div>
  );
};

export default InfiniteList;
