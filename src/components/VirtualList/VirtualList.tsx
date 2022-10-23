import React from "react";
import { throttle } from "@utils";
import { useGetRenderedIndexRange } from "@components/VirtualList/hooks";
import { If } from "@components";

import { ILoadMoreItemProps } from "@components/VirtualList/types";

export interface IVirtualListProps {
  data: any[];
  itemHeight: number;
  viewportHeight?: number;
  preloadItemCount?: number;

  isFetching?: boolean;
  onRenderItem: (item: any, index: number) => React.ReactNode;
  onBottomReached?: () => void;
  loadMoreItem?:
    | React.ReactNode
    | ((props: ILoadMoreItemProps) => React.ReactNode | JSX.Element);
}

export const VirtualList: React.FC<IVirtualListProps> = (props) => {
  const {
    data,
    itemHeight,
    viewportHeight = window.innerHeight,
    preloadItemCount = 5, // plus some rows before and after the list
    onRenderItem,
    onBottomReached,
    isFetching = false,
    loadMoreItem,
  } = props;

  const totalItems = data.length;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = React.useState(0);

  const handleScroll = throttle(
    (e: React.UIEvent<HTMLElement>) =>
      setScrollTop((e.target as HTMLElement).scrollTop),
    50
  );

  const handleRenderItem = React.useCallback(
    (item: any, renderIndex: number): [React.ReactNode] => {
      const Item = onRenderItem(item, renderIndex);
      return [Item];
    },
    [onRenderItem]
  );

  const [startIndex, endIndex] = useGetRenderedIndexRange({
    totalItems,
    scrollTop,
    viewportHeight,
    itemHeight,
    preloadItemCount,
  });

  const items = React.useMemo(
    () =>
      data
        .map((item, index: number) => ({ ...item, index }))
        .slice(startIndex, endIndex + 1),
    [data, startIndex, endIndex]
  );

  const renderedItems = React.useMemo(() => {
    return items.map((item) => {
      const [Item] = handleRenderItem(item, item.index);

      return (
        <div
          key={item.index}
          style={{
            width: "100%",
            height: itemHeight,
            position: "absolute",
            top: `${item.index * itemHeight}px`,
          }}
        >
          {Item}
        </div>
      );
    });
  }, [handleRenderItem, itemHeight, items]);

  React.useLayoutEffect(() => {
    if (!containerRef.current) return;

    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
    const initScrollPosition = 0;
    const scrollPosition = scrollTop + clientHeight;

    if (scrollTop <= initScrollPosition) {
      // For the initial time, if user does not actually do any scroll action yet
      // Skip the check scrollPosition
      return;
    }

    if (scrollPosition >= scrollHeight) {
      if (typeof onBottomReached === "function") {
        onBottomReached();
      }
    }
  });

  const renderLoadMoreItem = (
    loadMoreItem:
      | React.ReactNode
      | ((props: ILoadMoreItemProps) => React.ReactNode | JSX.Element)
  ) => {
    return (
      <div
        style={{
          width: "100%",
          position: "absolute",
          top: `${itemHeight * totalItems}px`,
        }}
      >
        <div style={{ position: "relative" }}>
          {typeof loadMoreItem === "function" ? loadMoreItem({}) : loadMoreItem}
        </div>
      </div>
    );
  };

  return (
    <div className="virtual-list">
      <div
        className="container"
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          width: "100%",
          height: viewportHeight,
          overflowY: "scroll",
          position: "relative",

          backgroundColor: "red",
        }}
      >
        <div
          className="scroller"
          style={{
            width: "100%",
            position: "absolute",
            height: `${itemHeight * totalItems}px`,
          }}
        >
          {renderedItems}

          <If condition={!!isFetching}>{renderLoadMoreItem(loadMoreItem)}</If>
        </div>
      </div>
    </div>
  );
};

export default VirtualList;
