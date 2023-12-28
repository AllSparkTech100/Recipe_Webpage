import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";

function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);
  const getVeggie = async () => {
    // const check = localStorage.getItem("popular");
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }&number=9&tags=vegetarian`
    );
    const data = await api.json();
    //   localStorage.setItem("popular", JSON.stringify(data.recipes));
    setVeggie(data.recipes);
    // if (check) {
    //   setPopular(JSON.parse(check));
    // } else {

    // }
  };
  return (
    <div>
      <Wrapper>
        <h3>Our Vegetarian Picks</h3>
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: `free`,
            gap: "2rem",
          }}
        >
          {veggie.map((recipes) => {
            return (
              <SplideSlide key={recipes.id}>
                <Card>
                  <Link to={"/recipe/" + recipes.id}>
                    <p>{recipes.title}</p>
                    <img src={recipes.image} alt={recipes.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
          ;
        </Splide>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    word-wrap: wrap;
    color: white;
    width: 100%;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    height: 40%;
    display: flex;
    align-items: center;
    justify-contents: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Veggie;
