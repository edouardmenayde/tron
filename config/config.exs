# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :tron, ecto_repos: [Tron.Repo]

# Configures the endpoint
config :tron, TronWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "AYmhDMpqZZlblgtZ5Ad18ibYPYQl1G47tHqchEo+xS5TSXamjQthCWpa6eCRNfi2",
  render_errors: [view: TronWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Tron.PubSub, adapter: Phoenix.PubSub.PG2]

config :tron, TronWeb.Presence,
  pubsub_server: Tron.PubSub,
  heartbeat_interval: 500

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
