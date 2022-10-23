import React from "react";

export interface IUseGetRenderedIndexRangeProps {
  totalItems: number;
  scrollTop: number;
  itemHeight: number;
  viewportHeight: number;
  preloadItemCount: number;
}

const useGetRenderedIndexRange = ({
  totalItems,
  scrollTop,
  itemHeight,
  viewportHeight: containerHeight,
  preloadItemCount,
}: IUseGetRenderedIndexRangeProps) => {
  const itemsPerPage = Math.floor(containerHeight / itemHeight);

  const [startIndex, endIndex] = React.useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = startIndex + itemsPerPage - 1;

    return [startIndex, endIndex];
  }, [itemHeight, itemsPerPage, scrollTop]);

  const [visibleStartIndex, visibleEndIndex] = React.useMemo(() => {
    const BUFFER_ROWS = preloadItemCount;

    const visibleStartIndex = Math.max(startIndex - BUFFER_ROWS, 0);
    const lastIndex = Math.max(totalItems - 1, 0);
    const visibleEndIndex = Math.min(endIndex + BUFFER_ROWS, lastIndex);

    return [visibleStartIndex, visibleEndIndex];
  }, [preloadItemCount, startIndex, totalItems, endIndex]);

  return [visibleStartIndex, visibleEndIndex];
};

export default useGetRenderedIndexRange;
