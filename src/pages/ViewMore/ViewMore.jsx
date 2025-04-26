import React, { useState } from "react";
import Search from "../../components/Shared/Search/Search";

const ViewMore = () => {
  const [search, setSearch] = useState("");
  return (
    <section className="bg-[#F4F5F6]">
      <div className="max-w-[1336px] w-full mx-auto px-[20px]">
        <div className="pt-[24px] pb-[37px]">
          <div className="mb-[29px]">
            <input
              className="border-2 rounded-[10px] border-[#98A3AE52] w-full py-3 px-[23px] outline-none"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Example: Volunteering in IT Department"
            />
          </div>
          <Search search={search} setSearch={setSearch} />
        </div>
      </div>
    </section>
  );
};

export default ViewMore;
