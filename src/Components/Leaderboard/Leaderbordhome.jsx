
import React from "react";

//  Redux
import { useSelector } from "react-redux";

// Component
import { Leaderboardactivity, PointsActivity } from "./Leaderboardactivity";

function Leaderbordhome() {
  const { loggedUserInfo } = useSelector((state) => state.auth);

  return (
    <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
      <div className="main-content flex flex-col flex-grow">
        {loggedUserInfo?.is_lg_admin === 1 && (
          <Leaderboardactivity />
        )}
        {loggedUserInfo?.is_lg_admin === 0 && (
          <PointsActivity />
        )}
      </div>
    </main>
  );
}

export default Leaderbordhome;
