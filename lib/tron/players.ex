defmodule Tron.Players do
  use ExActor.GenServer, export: __MODULE__

  def table do
    __MODULE__
  end

  defstart start_link do
    :ets.new(__MODULE__, [:named_table, :set, :protected])
    |> initial_state
  end

  defcall get(player_id), state: table do
    case :ets.lookup(table, player_id) do
      [{^player_id, info}] -> reply(info)
      [] -> reply(false)
    end
  end

  defcast insert(player_id, info), state: table do
    :ets.insert(
      table,
      {
        player_id,
        info
      }
    )

    new_state(table)
  end

  defcall get_all, state: table do
    players = :ets.tab2list(table)

    reply(players)
  end

  defcast delete(playerId), state: table do
    :ets.delete(table, playerId)

    new_state(table)
  end
end
