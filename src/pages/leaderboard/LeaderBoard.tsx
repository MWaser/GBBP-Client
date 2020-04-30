import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import axios from "axios";
const config = require('../../config');
import PageTitle from "../../components/PageTitle";

export default function Lboard() {
    const [tableData, setTableData] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get(config.apiUrl + '/api/user/leaderboard').then(res => { setTableData(res.data); setLoaded(true); })
            .catch(err => { alert(err.message); setLoaded(true) })
    }, []);

    if (loaded) {
        return (<>
            <PageTitle title="Leaderboard" />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable title="Member List" data={tableData} columns={["Name", "StatusStr"]} options={{ filterType: "checkbox", }} />
                </Grid>
            </Grid>
        </>);
    } else { return (<div> Loading... </div>); }
};
