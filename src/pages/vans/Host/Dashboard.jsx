import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { BetserFill } from "react-bootstrap-icons";
import { getHostVans } from "../../../api";

export default function Dashboard() {
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading((prevVal) => !prevVal);
    getHostVans()
      .then((data) => setVans(data.vans))
      .catch((err) => setError(err))
      .finally(() => setLoading((prevVal) => !prevVal));
  }, []);
}

function renderVanElements(vans) {
  const hostVansEls = vans.map((van) => {
    <div className="host-van-single" key={van.id}>
      <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
      <div className="host-van-info">
        <h3>{van.name}</h3>
        <p>${van.price}/day</p>
      </div>
      <Link to={`/vans/${van.id}`}>View</Link>
    </div>;
  });
}
