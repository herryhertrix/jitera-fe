
import styled from "@emotion/styled";
import { Box, Button, Paper, Tab, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Tabs } from "@mui/material";
import { Stack } from "@mui/system";
import Layout from "../src/components/layout";
import Countdown from "react-countdown";
import BidItemModal from "../src/components/modal/biditem";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectuser } from "../src/redux/reducers/userReducer";
import renderer from "../src/helpers/countdown";
import TabPanel from "../src/helpers/tabpanel";

interface ItemProps {
  userId: string,
  name: string,
  timewindow: number,
  startprice: number
}

function Home() {
  const [rows, setRows] = useState<ItemProps[]>([])
  const user = useSelector(selectuser)
  const now = new Date(Date.now()).getTime()

  useEffect(() => {
    fetch(`${process.env.API}/items/`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then(async resp => {
      const value = await resp.json()
      if (value.length != 0) {
        setRows(value)
      }
    }).catch(reason => {
    });
  }, []);
  const StyledTableCell = styled(TableCell)(({ theme }: any) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }: any) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const [tabs, settabs] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    settabs(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  return (
    <Layout>
      <div className="flex max-w-[1000px] w-full mx-auto flex-col gap-5 mt-[50px] h-full">
        <div className="flex flex-row gap-3 px-9 mr-auto">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabs} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Ongiong" {...a11yProps(0)} />
              <Tab label="Completed" {...a11yProps(1)} />
            </Tabs>
          </Box>
        </div>
        {tabs == 0 && <div className="px-9">
          <TableContainer component={Paper}  >
            <Table sx={{ minWidth: 325 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Current Price</StyledTableCell>
                  <StyledTableCell align="right">Duration</StyledTableCell>
                  {user.id !== "" && <StyledTableCell align="right">Bid</StyledTableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.filter((x)=> now < new Date(x.timewindow).getTime()).map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>

                    <StyledTableCell align="right">{row.startprice.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}</StyledTableCell>
                    <StyledTableCell align="right">        <Countdown
                      date={row.timewindow}
                      renderer={renderer}
                    /></StyledTableCell>
                    {user.id !== "" && <StyledTableCell align="right"><BidItemModal item={row}></BidItemModal></StyledTableCell>}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>}
        {tabs == 1 && <div className="px-9">
          <TableContainer component={Paper}  >
            <Table sx={{ minWidth: 325 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Current Price</StyledTableCell>
                  <StyledTableCell align="right">Duration</StyledTableCell>
                  {user.id !== "" && <StyledTableCell align="right">Bid</StyledTableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.filter((x)=> now > new Date(x.timewindow).getTime()).map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>

                    <StyledTableCell align="right">{row.startprice.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}</StyledTableCell>
                    <StyledTableCell align="right">        <Countdown
                      date={row.timewindow}
                      renderer={renderer}
                    /></StyledTableCell>
                    {user.id !== "" && <StyledTableCell align="right"><BidItemModal item={row}></BidItemModal></StyledTableCell>}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>}
      </div>
    </Layout>
  );
}

export default Home;