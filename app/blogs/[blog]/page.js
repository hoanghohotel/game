import PageTitleArea from "@/components/Common/PageTitleArea";
import React from "react";
import { notFound } from "next/navigation";
import DateFormat from "@/utilities/DateFormat";
import { headers } from "next/headers";
import Comments from "@/components/Sections/BlogDetails/Comments";
import StringLang from "@/utilities/StringLang";
async function getData(params) {
  const res = await fetch(
    `${process.env.BASE_URL}api/blog/${params}?lang_code=en`,
    {
      cache: "no-store",
    }
  );
  if (res.ok) {
    return res?.json();
  } else {
    notFound();
  }
}
export async function generateMetadata(ctx) {
  const data = await getData(ctx.params.blog);
  return {
    title: data?.blog?.seo_title,
    description: data?.blog?.seo_description,
    keywords:
      data?.blog_tags && data?.blog_tags.length > 0
        ? data?.blog_tags.map((item) => item.value).toString()
        : "",
  };
}
async function page(ctx) {
  const { blog, blog_tags, total_comment } = await getData(ctx.params.blog);
  const headersList = headers();
  const referer = headersList.get("referer");
  return (
    <>
      <PageTitleArea
        title="Blog Details"
        breadcrumb={[
          { name: "home", path: "/" },
          { name: "blogs", path: "/blogs" },
          { name: blog.title, path: `/blogs/${ctx.params.blog}` },
        ]}
      />
      <div className="w-full blog-details-container py-[60px]">
        <div className="theme-container mx-auto">
          <div className="w-full lg:px-[200px]">
            <div className="w-full">
              {/* thumb */}
              <div className="w-full h-[420px] rounded-[5px] overflow-hidden mb-8">
                <img
                  src={process.env.BASE_URL + blog.image}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              {/* quick details */}
              <div className="w-full flex sm:space-x-[46px] space-x-3 items-center mb-[22px]">
                <div className="flex  space-x-2.5 items-center">
                  <span>
                    <svg
                      width="13"
                      height="15"
                      viewBox="0 0 13 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.39646 14.9992C0.0826236 14.8744 -0.00948057 14.6212 0.000753228 14.2727C0.0280433 13.4361 0.140615 12.6215 0.440806 11.8473C0.925206 10.596 1.76779 9.72642 2.90715 9.16869C3.72585 8.76874 4.59573 8.58161 5.48607 8.50088C6.32183 8.42383 7.15418 8.43851 7.98653 8.55592C9.05425 8.70636 10.0708 9.02926 10.9646 9.70808C11.9845 10.4823 12.5951 11.5537 12.8408 12.8563C12.9294 13.3223 12.9431 13.803 12.9943 14.28C13.0318 14.6249 12.9192 14.8818 12.602 15.0065C8.53233 14.9992 4.4661 14.9992 0.39646 14.9992ZM11.9334 13.8984C11.9402 13.8837 11.9504 13.8727 11.947 13.8654C11.9368 13.7479 11.9299 13.6305 11.9163 13.5168C11.8276 12.8123 11.6298 12.1481 11.2545 11.5574C10.7292 10.7318 9.98553 10.2365 9.11907 9.93557C8.27648 9.64203 7.41002 9.55397 6.52991 9.5503C5.60546 9.54663 4.69124 9.64203 3.80772 9.96126C3.1937 10.1814 2.63766 10.5116 2.17373 11.0033C1.60746 11.6051 1.28339 12.3463 1.13329 13.1792C1.09236 13.414 1.06507 13.6562 1.03096 13.9021C4.68783 13.8984 8.31401 13.8984 11.9334 13.8984Z"
                        fill="#45F882"
                      />
                      <path
                        d="M9.87446 3.82281C9.83352 5.02633 9.39006 6.10877 8.43832 6.92701C7.42517 7.79663 5.89351 7.89203 4.81896 7.11415C3.49539 6.1528 2.98029 4.78416 3.17132 3.10363C3.28731 2.09825 3.73759 1.28 4.50172 0.681906C5.23855 0.10583 6.0709 -0.0886417 6.96465 0.0361137C7.93004 0.171877 8.70781 0.670898 9.26384 1.53685C9.69025 2.19365 9.86764 2.93851 9.87446 3.82281ZM4.14012 3.62467C4.15036 4.44291 4.35844 5.10705 4.80191 5.68313C5.63426 6.7619 7.12498 6.84629 8.04261 5.84825C8.70781 5.1254 8.95683 4.2411 8.81356 3.24673C8.54065 1.34605 6.69857 0.608521 5.32383 1.41576C4.49831 1.90011 4.16741 2.71469 4.14012 3.62467Z"
                        fill="#45F882"
                      />
                    </svg>
                  </span>
                  <span className="text-sm">
                    <StringLang string="By" /> {blog.admin.name}
                  </span>
                </div>
                <div className="flex  space-x-2.5 items-center">
                  <span>
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.973 2.71659C15.973 4.39794 15.973 6.0793 15.973 7.76065C15.9327 7.72394 15.896 7.68722 15.8556 7.65419C15.5511 7.38253 15.2503 7.10352 14.9385 6.83921C14.8431 6.75844 14.7955 6.69236 14.7991 6.56388C14.8101 6.21513 14.8028 5.8627 14.8028 5.51028C10.5768 5.51028 6.36912 5.51028 2.15045 5.51028C2.15045 5.57269 2.15045 5.62775 2.15045 5.67915C2.15045 8.16079 2.15045 10.6424 2.15045 13.1241C2.15045 13.6013 2.37056 13.8253 2.84745 13.8253C4.3625 13.8253 5.87389 13.8326 7.38894 13.8179C7.63839 13.8142 7.8108 13.8656 7.91352 14.0969C7.93553 14.1446 7.97588 14.185 8.01257 14.2254C8.25468 14.4824 8.50046 14.743 8.74258 15C6.6736 15 4.60462 15 2.53197 15C2.4696 14.9853 2.41091 14.9706 2.34855 14.9559C1.52316 14.7577 0.980231 14.0675 0.976562 13.2085C0.976562 11.6189 0.976562 10.0257 0.976562 8.43245C0.976562 6.60426 0.976562 4.77974 0.976562 2.95154C0.976562 2.09251 1.51949 1.38767 2.34855 1.21512C2.64569 1.15272 2.9575 1.17841 3.26565 1.16373C3.32067 1.16006 3.3757 1.16373 3.4454 1.16373C3.4454 0.759912 3.4454 0.381791 3.4454 0C3.83792 0 4.21943 0 4.61195 0C4.61195 0.389134 4.61195 0.767254 4.61195 1.15272C7.19084 1.15272 9.75873 1.15272 12.345 1.15272C12.345 0.763583 12.345 0.37812 12.345 0C12.7448 0 13.1263 0 13.5188 0C13.5188 0.389134 13.5188 0.770925 13.5188 1.16373C13.772 1.16373 14.0141 1.15639 14.2599 1.16373C14.8248 1.18576 15.2797 1.42438 15.6282 1.87225C15.8189 2.12188 15.907 2.41557 15.973 2.71659ZM12.345 2.34582C9.75506 2.34582 7.18717 2.34582 4.60462 2.34582C4.60462 2.73495 4.60462 3.11307 4.60462 3.49853C4.2121 3.49853 3.83058 3.49853 3.43073 3.49853C3.43073 3.10573 3.43073 2.72394 3.43073 2.3348C3.19595 2.3348 2.97584 2.33113 2.75574 2.3348C2.39257 2.34214 2.15045 2.58076 2.14678 2.9442C2.14312 3.30029 2.14678 3.65639 2.14678 4.01248C2.14678 4.1116 2.14678 4.21439 2.14678 4.31351C6.37279 4.31351 10.5841 4.31351 14.7991 4.31351C14.7991 3.82893 14.8065 3.35536 14.7955 2.88179C14.7881 2.60646 14.5827 2.36784 14.3076 2.34214C14.0471 2.32012 13.783 2.33847 13.5078 2.33847C13.5078 2.73128 13.5078 3.11307 13.5078 3.49486C13.1117 3.49486 12.7338 3.49486 12.345 3.49486C12.345 3.11307 12.345 2.73495 12.345 2.34582Z"
                        fill="#45F882"
                      />
                      <path
                        d="M11.7257 14.9989C11.3442 14.9071 10.9444 14.8594 10.5812 14.7162C9.37796 14.239 8.55991 13.369 8.22608 12.1171C7.79688 10.5275 8.21508 9.14355 9.44766 8.04957C10.3428 7.25295 11.4139 6.94825 12.5988 7.13547C14.0222 7.35941 15.0383 8.15236 15.6289 9.45559C15.7903 9.80801 15.8417 10.2118 15.9444 10.59C15.9591 10.6413 15.9628 10.6927 15.9738 10.7441C15.9738 10.9387 15.9738 11.1333 15.9738 11.3315C15.9224 11.5885 15.8967 11.8528 15.8197 12.1024C15.4528 13.3433 14.6715 14.228 13.4682 14.7089C13.1014 14.8557 12.6979 14.9035 12.3127 14.9989C12.1146 14.9989 11.9202 14.9989 11.7257 14.9989ZM12.0155 13.8278C13.5453 13.8278 14.7999 12.5723 14.7999 11.0415C14.7962 9.51433 13.5526 8.26616 12.0266 8.25882C10.4968 8.25148 9.23856 9.50332 9.23489 11.0378C9.23123 12.5687 10.4858 13.8242 12.0155 13.8278Z"
                        fill="#45F882"
                      />
                      <path
                        d="M3.21094 7.89858C3.21094 7.50944 3.21094 7.13132 3.21094 6.74219C3.59621 6.74219 3.97415 6.74219 4.36309 6.74219C4.36309 7.12031 4.36309 7.50577 4.36309 7.89858C3.98515 7.89858 3.60355 7.89858 3.21094 7.89858Z"
                        fill="#45F882"
                      />
                      <path
                        d="M6.71418 6.74219C6.71418 7.13132 6.71418 7.50944 6.71418 7.8949C6.32524 7.8949 5.94363 7.8949 5.55469 7.8949C5.55469 7.50944 5.55469 7.13132 5.55469 6.74219C5.93629 6.74219 6.3179 6.74219 6.71418 6.74219Z"
                        fill="#45F882"
                      />
                      <path
                        d="M9.0584 6.74219C9.0584 7.13132 9.0584 7.50944 9.0584 7.8949C8.67313 7.8949 8.29519 7.8949 7.90625 7.8949C7.90625 7.51678 7.90625 7.13499 7.90625 6.74219C8.28419 6.74219 8.66579 6.74219 9.0584 6.74219Z"
                        fill="#45F882"
                      />
                      <path
                        d="M3.21094 10.2387C3.21094 9.85319 3.21094 9.4714 3.21094 9.08594C3.59988 9.08594 3.98149 9.08594 4.37043 9.08594C4.37043 9.4714 4.37043 9.84952 4.37043 10.2387C3.98882 10.2387 3.60722 10.2387 3.21094 10.2387Z"
                        fill="#45F882"
                      />
                      <path
                        d="M5.55469 10.2423C5.55469 9.85319 5.55469 9.47507 5.55469 9.08594C5.93996 9.08594 6.3179 9.08594 6.70684 9.08594C6.70684 9.46406 6.70684 9.84952 6.70684 10.2423C6.3289 10.2423 5.9473 10.2423 5.55469 10.2423Z"
                        fill="#45F882"
                      />
                      <path
                        d="M3.21875 11.4297C3.60769 11.4297 3.98563 11.4297 4.3709 11.4297C4.3709 11.8152 4.3709 12.1933 4.3709 12.5824C3.99297 12.5824 3.61136 12.5824 3.21875 12.5824C3.21875 12.2043 3.21875 11.8225 3.21875 11.4297Z"
                        fill="#45F882"
                      />
                      <path
                        d="M6.71418 11.4375C6.71418 11.823 6.71418 12.2011 6.71418 12.5902C6.32524 12.5902 5.94363 12.5902 5.55469 12.5902C5.55469 12.2084 5.55469 11.8266 5.55469 11.4375C5.93262 11.4375 6.31423 11.4375 6.71418 11.4375Z"
                        fill="#45F882"
                      />
                      <path
                        d="M11.4219 9.08594C11.8108 9.08594 12.1888 9.08594 12.5814 9.08594C12.5814 9.54115 12.5814 9.98902 12.5814 10.4516C12.9153 10.4516 13.2382 10.4516 13.5721 10.4516C13.5721 10.8481 13.5721 11.2262 13.5721 11.6153C12.8639 11.6153 12.1484 11.6153 11.4219 11.6153C11.4219 10.7783 11.4219 9.93763 11.4219 9.08594Z"
                        fill="#45F882"
                      />
                    </svg>
                  </span>
                  <span className="text-sm">{DateFormat(blog.created_at)}</span>
                </div>
                <div className="flex  space-x-2.5 items-center">
                  <span>
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.45621 14.9603C7.23397 14.952 6.07847 14.673 4.99389 14.1068C4.87292 14.0444 4.7728 14.0361 4.64348 14.0735C3.65067 14.3608 2.65786 14.6439 1.66088 14.927C1.32716 15.0227 1.03933 14.8854 0.97676 14.5814C0.955902 14.4732 0.97676 14.3441 1.00596 14.2317C1.28545 13.2367 1.56911 12.2459 1.85694 11.2551C1.88614 11.1468 1.8778 11.0635 1.82357 10.9636C-0.470742 6.65888 1.97791 1.30085 6.73756 0.197598C10.8924 -0.7641 14.9804 1.87953 15.8105 6.06354C16.5948 10.0061 14.0084 13.9362 10.0789 14.773C9.54914 14.8854 9.00267 14.927 8.46038 15.0019C8.46038 14.9894 8.45621 14.9728 8.45621 14.9603ZM2.19066 13.728C2.26157 13.7113 2.30329 13.703 2.34083 13.6947C3.0917 13.4824 3.84256 13.2784 4.58926 13.0536C4.84789 12.9745 5.0648 13.0078 5.29841 13.1368C6.70419 13.9195 8.20175 14.1568 9.7744 13.8321C13.316 13.0993 15.5602 9.64389 14.7969 6.1135C13.9918 2.3916 10.129 0.16013 6.49979 1.31334C3.8509 2.15846 2.06134 4.52316 1.97374 7.33332C1.9362 8.51983 2.22403 9.63973 2.81221 10.6722C2.93318 10.8845 2.95821 11.0802 2.88729 11.3092C2.79135 11.6089 2.70792 11.917 2.62032 12.2209C2.47849 12.7122 2.34083 13.2034 2.19066 13.728Z"
                        fill="#45F882"
                      />
                      <path
                        d="M8.43505 5.48879C7.45059 5.48879 6.46612 5.48879 5.48582 5.48879C5.10622 5.48879 4.85593 5.1474 4.98942 4.81435C5.06868 4.61868 5.21885 4.51043 5.43159 4.49794C5.49834 4.49378 5.56508 4.49794 5.636 4.49794C7.54236 4.49794 9.44455 4.49794 11.3509 4.49794C11.4177 4.49794 11.4886 4.49378 11.5511 4.51043C11.8014 4.56039 11.9725 4.79769 11.9474 5.04749C11.9224 5.29728 11.7138 5.49295 11.451 5.49295C10.7711 5.49711 10.087 5.49295 9.40701 5.49295C9.08163 5.48878 8.76043 5.48879 8.43505 5.48879Z"
                        fill="#45F882"
                      />
                      <path
                        d="M8.44795 7.98123C7.45931 7.98123 6.47067 7.98123 5.48203 7.98123C5.10243 7.98123 4.85631 7.63568 4.9898 7.29847C5.06488 7.10696 5.24426 6.98623 5.46535 6.98623C5.75735 6.98206 6.04935 6.98623 6.34136 6.98623C8.02663 6.98623 9.71191 6.98623 11.3972 6.98623C11.7935 6.98623 12.0438 7.31928 11.9144 7.66066C11.8394 7.86466 11.6558 7.98123 11.4097 7.98123C10.4252 7.98123 9.43659 7.98123 8.44795 7.98123Z"
                        fill="#45F882"
                      />
                      <path
                        d="M8.45568 9.47656C9.44432 9.47656 10.433 9.47656 11.4216 9.47656C11.8095 9.47656 12.0598 9.83043 11.9138 10.1677C11.8221 10.38 11.6469 10.4757 11.4174 10.4757C10.5539 10.4757 9.69044 10.4757 8.82694 10.4757C7.71733 10.4757 6.61189 10.4757 5.50228 10.4757C5.11016 10.4757 4.86404 10.1302 4.99753 9.79297C5.07679 9.59313 5.25616 9.48073 5.50645 9.48073C6.49092 9.47656 7.47121 9.47656 8.45568 9.47656Z"
                        fill="#45F882"
                      />
                    </svg>
                  </span>
                  <span className="text-sm">
                    {total_comment} <StringLang string="Comment" />
                  </span>
                </div>
              </div>
              {/* article */}
              <article>
                <div className="w-full  mb-7">
                  <h1 className="text-[32px] leading-[38px] font-bold text-white mb-[15px]">
                    {blog.title}
                  </h1>
                  <div
                    className="blog-details-html"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  ></div>
                </div>
              </article>
            </div>
            {/*  other features*/}
            <div className="md:flex justify-between items-center pt-[21px] border-t border-[#23262B] mt-[30px]">
              <div className="flex space-x-[26px] items-center mb-2">
                <span className="text-xl font-bold text-white">
                  <StringLang string="Tags" />:
                </span>
                <div className="flex flex-wrap space-x-6 items-center">
                  {blog_tags &&
                    blog_tags.length > 0 &&
                    blog_tags.map((item, i) => (
                      <span
                        key={i}
                        className="text-base leading-[26px] hover:text-primary-blue"
                      >
                        #{item.value}
                      </span>
                    ))}
                </div>
              </div>
              <div className="flex space-x-[26px] items-center">
                <span className="text-xl font-bold text-white">
                  <StringLang string="Share" />:
                </span>
                <div className="flex space-x-2.5 items-center">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${referer}&t=${blog.title}`}
                    target="_blank"
                  >
                    <div className="w-[34px] h-[34px] rounded-full bg-primary-blue flex justify-center items-center social-shadow">
                      <svg
                        width="10"
                        height="20"
                        viewBox="0 0 10 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.16198 9.96289H6.58153V19.4074H2.67192V9.96289H0.8125V6.64371H2.67192V4.49583C2.67192 2.95986 3.40223 0.554688 6.61633 0.554688L9.51231 0.566792V3.78862H7.41109C7.06642 3.78862 6.58178 3.96066 6.58178 4.69336V6.6468H9.50355L9.16198 9.96289Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  </a>
                  <a
                    href={`https://twitter.com/share?text=${blog.title}&url=${referer}`}
                    target="_blank"
                  >
                    <div className="w-[34px] h-[34px] rounded-full bg-primary-blue flex justify-center items-center social-shadow">
                      <svg
                        width="18"
                        height="15"
                        viewBox="0 0 18 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.8496 2.4375C17.2187 2.71696 16.5402 2.90598 15.8285 2.99039C16.5551 2.55547 17.1127 1.86731 17.3759 1.04598C16.696 1.44891 15.9427 1.74122 15.1415 1.89877C14.4997 1.21585 13.5852 0.789062 12.5726 0.789062C10.6297 0.789062 9.05397 2.36331 9.05397 4.30432C9.05397 4.57985 9.08519 4.84803 9.14555 5.10547C6.22129 4.95892 3.62846 3.55953 1.8929 1.43213C1.59009 1.9512 1.41637 2.55547 1.41637 3.19959C1.41637 4.41888 2.03801 5.4953 2.98163 6.12552C2.40512 6.10743 1.8622 5.94935 1.38803 5.68536C1.38777 5.7003 1.38777 5.71525 1.38777 5.72993C1.38777 7.43316 2.60114 8.85378 4.21047 9.1765C3.91553 9.25724 3.60405 9.29997 3.28366 9.29997C3.05641 9.29997 2.83625 9.27821 2.62161 9.23732C3.06927 10.6336 4.36844 11.6499 5.9085 11.6785C4.70406 12.6215 3.18709 13.1833 1.53813 13.1833C1.25473 13.1833 0.973958 13.1668 0.699219 13.134C2.25555 14.1318 4.10551 14.7135 6.09245 14.7135C12.5644 14.7135 16.1038 9.35712 16.1038 4.71145C16.1038 4.55914 16.1004 4.40735 16.0935 4.25687C16.7816 3.76139 17.378 3.14244 17.8496 2.4375Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${referer}&title=${blog.title}`}
                    target="_blank"
                  >
                    <div className="w-[34px] h-[34px] rounded-full bg-primary-blue flex justify-center items-center social-shadow">
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.7379 9.93077V15.7502H13.3607V10.3208C13.3607 8.95751 12.8731 8.02652 11.6503 8.02652C10.7171 8.02652 10.1628 8.6533 9.91795 9.26021C9.82904 9.4771 9.80612 9.77829 9.80612 10.0825V15.75H6.42864C6.42864 15.75 6.47398 6.55429 6.42864 5.60242H9.80637V7.04042C9.79957 7.05174 9.79 7.06281 9.78396 7.07363H9.80637V7.04042C10.2552 6.35048 11.0556 5.36413 12.8501 5.36413C15.0721 5.36413 16.7379 6.81447 16.7379 9.93077ZM2.89551 0.710938C1.74021 0.710938 0.984375 1.46856 0.984375 2.46397C0.984375 3.43824 1.7183 4.21776 2.85118 4.21776H2.87309C4.05106 4.21776 4.78347 3.43824 4.78347 2.46397C4.76106 1.46856 4.05106 0.710938 2.89551 0.710938ZM1.18511 15.7502H4.56133V5.60242H1.18511V15.7502Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            {/*comments*/}
            <Comments blogId={blog?.id} />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
