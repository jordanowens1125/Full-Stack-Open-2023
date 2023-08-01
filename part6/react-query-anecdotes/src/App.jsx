import { useQueryClient, useQuery, useMutation } from "react-query";
import { getAnecdotes, createAnecdote, updateAnecdote } from "./requests";
import { useNotificationDispatch } from "./NotificationContext";
import Notification from "./components/Notification";

function App() {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const result = useQuery("anecdotes", getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
      notificationDispatch({
        type: "SET",
        payload: `You have created new anecdote "${newAnecdote.content}"`,
      });
    },
    onError: (error) => {
      notificationDispatch({
        type: "SET",
        payload: `${error.response.data.error}`,
      });
    },
  });

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      const anecdoteToChangeIndex = anecdotes.findIndex(
        (anecdote) => anecdote.id === updatedAnecdote.id
      );
      anecdotes[anecdoteToChangeIndex] = updatedAnecdote;
      queryClient.setQueryData("anecdotes", anecdotes);
      notificationDispatch({
        type: "SET",
        payload: `You have voted for anecdote "${updatedAnecdote.content}"`,
      });
    },
  });

  if (result.isError) {
    return <div>Anecdote service not available due to problems in server</div>;
  }

  if (result.isLoading) {
    return <div>Loading Data</div>;
  }

  const anecdotes = result.data;

  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  const handleVote = async (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote);
  };

  return (
    <div>
      <h1>Anecdote App</h1>
      <Notification />
      <form onSubmit={addAnecdote}>
        <input type="text" name="anecdote" />
        <button type="submit">Create New Anecdote</button>
      </form>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>Votes: {anecdote.votes}</div>
          <button onClick={() => handleVote(anecdote)}>Vote</button>
        </div>
      ))}
    </div>
  );
}

export default App;
