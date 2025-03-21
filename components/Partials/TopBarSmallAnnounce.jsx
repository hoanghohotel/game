"use client";
import React from "react";
import DropDown from "@/components/Helper/DropDown";
import { useDispatch } from "react-redux";
import { changeCurrency } from "@/store/features/setup/setupSlice";

function TopBarSmallAnnounce({ currencies, languages, settings }) {
  const dispatch = useDispatch();
  const changeCurrencyHandler = (value) => {
    dispatch(changeCurrency(value));
  };
  return (
    <div className="w-full bg-[#0B0E12] lg:h-[44px] h-10 lg:block hidden">
      <div className="theme-container mx-auto h-full">
        <div className="w-full h-full flex justify-between items-center">
          <div className="topbar-dropdowns">
            <div className="flex space-x-6  items-center">
              <div className="flex space-x-2  items-center rtl:ml-2 ltr:ml-0">
                <span className=" ml-0 text-white">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 19V17.3541C21 16.5363 20.5021 15.8008 19.7428 15.4971L17.7086 14.6835C16.7429 14.2971 15.6422 14.7156 15.177 15.646L15 16C15 16 12.5 15.5 10.5 13.5C8.5 11.5 8 9 8 9L8.35402 8.82299C9.28438 8.35781 9.70285 7.25714 9.31654 6.29136L8.50289 4.25722C8.19916 3.4979 7.46374 3 6.64593 3H5C3.89543 3 3 3.89543 3 5C3 13.8366 10.1634 21 19 21C20.1046 21 21 20.1046 21 19Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className=" text-base text-white font-medium leading-none rtl:ml-2 ltr:ml-0 ">
                  {settings?.topbar_phone}
                </span>
              </div>
              <div className="flex space-x-2  items-center ">
                <span className="ml-0 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    ></path>
                  </svg>
                </span>
                <span className="text-base text-white font-medium leading-none">
                  {settings?.topbar_email}
                </span>
              </div>
            </div>
          </div>
          <div className="space-x-9 items-center flex ">
            <DropDown
              width={150}
              action={changeCurrencyHandler}
              datas={
                currencies && currencies.length > 0
                  ? currencies
                      .map((currency) => ({
                        ...currency,
                        name: currency.currency_name,
                      }))
                      .sort((aDefault, bDefault) => aDefault !== bDefault && 1)
                  : []
              }
              position="right"
            >
              {({ item }) => (
                <div className="flex space-x-[6px] items-center">
                  <span className="text-base text-white font-medium">
                    {item.name}
                  </span>
                  <span>
                    <svg
                      width="9"
                      height="6"
                      viewBox="0 0 9 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="9.00391"
                        y="1"
                        width="6.36242"
                        height="1.41387"
                        transform="rotate(135 9.00391 1)"
                        fill="white"
                      />
                      <rect
                        x="4.5"
                        y="5.5"
                        width="6.36242"
                        height="1.41387"
                        transform="rotate(-135 4.5 5.5)"
                        fill="white"
                      />
                    </svg>
                  </span>
                </div>
              )}
            </DropDown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBarSmallAnnounce;
