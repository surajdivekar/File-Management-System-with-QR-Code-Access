import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      const arrayOfData = localStorage.getItem("LoginData");
      var d = arrayOfData !== null ? JSON.parse(arrayOfData) : [];
      setData(d);
      if (d.length !== 0) {
        navigate("/sidebar");
      }
    } catch (error) {
      console.log(error);
    }
  }, [navigate]);
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item sm={10}>
          <h1>Home Page</h1>
          <hr />
          {/* <p>Home Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio earum officiis debitis vel tenetur quos animi vero voluptates reiciendis, omnis sed in libero temporibus deleniti pariatur expedita corporis officia. Odit enim, quasi facere magnam earum officiis ipsa aliquid impedit velit quibusdam dolor ex esse ratione explicabo quod, culpa temporibus? Dolorem deleniti doloremque maxime quas deserunt. Ex aspernatur saepe illo eaque corrupti placeat, aperiam nulla adipisci itaque quos necessitatibus iure at minus non delectus ratione quod ad. Alias dolore perferendis est expedita iure! Nostrum laborum tempore amet commodi voluptas accusamus enim repudiandae, quia odio cumque, laboriosam architecto illo! Aliquid, fuga quis.</p> */}
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
