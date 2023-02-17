
import { Button } from "@mui/material";
import Layout from "../src/hoc/layout";


function Home() {
  return (
    <Layout>
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-fg-dark mb-3"> Welcome to the All-In-One Template!</p>
      <Button color="secondary" variant="contained">
        Works
      </Button>
    </div>
    </Layout>
  );
}

export default Home;