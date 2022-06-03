import { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './styles/theme';

import { useQuery } from 'react-query';

export interface Data {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

async function getUser(id: number) {
  const request = await fetch(
    `https://reqres.in/api/users/1?delay=1`,
  );

  const response = await request.json();

  if (!request.ok) {
    throw new Error(response.error);
  }
  return response.data as Data;
}

function App() {
  const [currentUserId, setCurrentUserId] = useState(1);
  const { data, isError, isLoading } = useQuery(
    ['users', currentUserId],
    () => getUser(currentUserId),
    {
      staleTime: 50000,
    },
  );

  if (isError) {
    return (
      <section>
        <p>Soment went wrong</p>
      </section>
    );
  }

  if (!data || isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <section>
        <img src={data.avatar} />
        <p>
          {data.first_name} {data.last_name} ({data.id})
        </p>
        <p>Email: {data.email}</p>

        <div>
          <button
            onClick={() =>
              setCurrentUserId((prev) => prev - 1)
            }
          >
            Prev
          </button>
          <button
            onClick={() =>
              setCurrentUserId((prev) => prev + 1)
            }
          >
            Next
          </button>
        </div>
      </section>
    </ChakraProvider>
  );
}
export default App;
