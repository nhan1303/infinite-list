import React from "react";
import { faker } from "@faker-js/faker";

import { List as UserList } from "@features/users/components";
import { IUser } from "@features/users/types";
const mockFetching = <T extends unknown>(from: number, amount = 10) => {
  const fakeMoreData: any[] = [];
  const stop = from + amount;
  for (let index = from; index < stop; index++) {
    fakeMoreData.push({
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    } as IUser);
  }

  return new Promise<T[]>((resolve) => {
    setTimeout(() => {
      resolve(fakeMoreData);
    }, 1000);
  });
};

export interface IListingPageProps {}

export const ListingPage: React.FC<IListingPageProps> = ({}) => {
  const [isFetching, setIsFetching] = React.useState(false);
  const itemsPerPage = 10;
  const [data, setData] = React.useState([] as IUser[]);
  const total = data.length;

  React.useEffect(() => {
    const fakeData = [];
    const initCount = 10;
    for (let index = 0; index < initCount; index++) {
      fakeData.push({
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
      } as IUser);
    }

    setData(fakeData);
  }, []);

  const handleLoadMore = React.useCallback(() => {
    const fetchData = async () => {
      setIsFetching(true);

      const newData = await mockFetching<IUser>(total, itemsPerPage);
      setData((prev: IUser[]) => [...prev, ...newData]);

      setIsFetching(false);
    };

    if (isFetching) return;
    fetchData();
  }, [total, isFetching]);

  return (
    <div className="user-listing-page">
      <UserList
        data={data}
        isFetching={isFetching}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default ListingPage;
