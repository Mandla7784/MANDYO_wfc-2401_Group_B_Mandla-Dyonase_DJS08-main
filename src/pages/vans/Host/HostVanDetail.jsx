import React from "react";
import { useParams, Link, NavLink, Outlet } from "react-router-dom";
import { getHostVans } from "../../../api";

export default function HostVanDetail() {
    const params = useParams();
    const [van, setVan] = useState(null);
    const [loading, setLoading] = useState(false);