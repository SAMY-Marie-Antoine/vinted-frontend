const Valid = ({ email, username, password, setSubmit }) => {
  return (
    <div>
      <article>
        {<h2>{email}</h2>}
        {<h2>{username}</h2>}
        {<h2>{password}</h2>}
      </article>
      <button
        onClick={() => {
          setSubmit(false);
        }}
      >
        Créer utilisateur
      </button>
    </div>
  );
};

export default Valid;
