
export default function Signin() {
  return (
    <section className="flex flex-col h-full w-full items-center justify-center">
      <header>
        <h1>Signin</h1>
      </header>

      <form action="">
        <div>
          <label htmlFor="">User name</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="text" />
        </div>

        <button>Signin</button>

      </form>

    </section>
  )
}
