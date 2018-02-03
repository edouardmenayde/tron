use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :tron, TronWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :tron, Tron.Repo,
  adapter: Ecto.Adapters.MySQL,
  username: "root",
  password: "",
  database: "tron_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
