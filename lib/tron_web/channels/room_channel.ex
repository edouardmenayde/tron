defmodule TronWeb.RoomChannel do
  use Phoenix.Channel
  alias TronWeb.UserSocket
  alias TronWeb.Presence

  # intercept(["presence_diff"])

  def join("room:game", %{"color" => color, "position" => position}, socket) do
    send(
      self(),
      {
        :after_join,
        %{
          color: color,
          position: position,
          user_id: UserSocket.id(socket)
        }
      }
    )

    {:ok, socket}
  end

  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_info({:after_join, player}, socket) do
    push(socket, "presence_state", Presence.list(socket))

    {:ok, _} =
      Presence.track(
        socket,
        UserSocket.id(socket),
        Map.merge(player, %{
          online_at: inspect(System.system_time(:seconds))
        })
      )

    {:noreply, socket}
  end

  # def handle_in(:presence_diff, diff, socket) do
  #   IO.inspect(diff)
  #   # unless UserSocket.id(socket) == message.user_id do
  #   #   socket
  #   #   |> push(@player_joined, message)
  #   # end

  #   # Presence.untrack(socket, UserSocket.id(socket))

  #   # broadcast(socket, "presence_diff", Presence.list(socket))

  #   {:noreply, socket}
  # end

  # def handle_out("presence_diff", diff, socket) do
  #   IO.inspect(diff)
  #   {:noreply, socket}
  # end

  # def terminate(reason, socket) do
  #   IO.inspect(reason)
  #   Presence.untrack(socket, UserSocket.id(socket))

  #   broadcast(socket, "presence_diff", Presence.list(socket))
  #   # send(
  #   #   self(),
  #   #   {
  #   #     :after_terminate
  #   #   }
  #   # )

  #   # Players.delete(player_id)

  #   # broadcast_from!(socket, @player_left, %{player_id: player_id})
  #   {:ok, socket}
  # end
end
