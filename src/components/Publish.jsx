import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function Publish({ token }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [etat, setEtat] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);
  const [imgFromCloudinary, setImgFromCloudinary] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("username", username);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("etat", etat);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);
      console.log("mon token", token);
      const response = await axios.post(
        "https://site--backend-vinted--ybvpc4ksyyjp.code.run/offer/publish",

        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      setImgFromCloudinary(response.data.secure_url);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container">
      <main className="form-center">
        <div>
          <form onSubmit={handleSubmit}>
            <h1>Vends ton article</h1>
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              placeholder="title"
              type="text"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <input
              placeholder="description"
              type="text"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
            <input
              placeholder="price"
              type="text"
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
            <input
              placeholder="etat"
              type="text"
              value={etat}
              onChange={(event) => {
                setEtat(event.target.value);
              }}
            />
            <input
              placeholder="city"
              type="text"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
            <input
              placeholder="brand"
              type="text"
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
              }}
            />
            <input
              placeholder="size"
              type="text"
              value={size}
              onChange={(event) => {
                setSize(event.target.value);
              }}
            />
            <input
              placeholder="color"
              type="text"
              value={color}
              onChange={(event) => {
                setColor(event.target.value);
              }}
            />
            <input
              placeholder="fichier..."
              type="file"
              onChange={(event) => {
                console.log(event);
                setPicture(event.target.files[0]);
              }}
            />
            <input type="submit" value="Poster une offre" />
          </form>
          {imgFromCloudinary && <img src={imgFromCloudinary} alt="" />}
        </div>
      </main>
    </div>
  );
}

export default Publish;
