const serverUrl = 'http://localhost:5001';

export class Api {
  static async getUserById({ id }) {
    return await get(`users/${id}`);
  }

  static async getUserByInfo({ query }) {
    const users = await get(`users?${query}`);
    return await users[0];
  }

  static async setUser({ user }) {
    return await set('users', user);
  }

  static async getNotes({ id }) {
    return await get(`notes?authorId=${id}`);
  }

  static async getNote({ id }) {
    return await get(`notes/${id}`);
  }

  static async setNote({ newNote }) {
    return await set(`notes`, newNote);
  }

  static async deleteNote({ id }) {
    return await delElem(`notes/${id}`);
  }

  static async updateNote({ newNote, id }) {
    return await update(`notes/${id}`, newNote);
  }
}

const get = async (url) => {
  const response = await fetch(`${serverUrl}/${url}`);

  if (!response.ok) {
    console.log('response not ok 404');
    throw new Response('', { status: 404 });
  }

  const obj = await response.json();
  return obj;
};

const set = async (url, obj) => {
  const response = await fetch(`${serverUrl}/${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  });

  if (!response.ok) {
    console.log('response not ok 404');
    throw new Response('', { status: 404 });
  }
};

const update = async (url, obj) => {
  const response = await fetch(`${serverUrl}/${url}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  });

  if (!response.ok) {
    console.log('response not ok 404');
    throw new Error(`Failed to update item. Status: ${response.status}`);
  }
};

const delElem = async (url) => {
  const response = await fetch(`${serverUrl}/${url}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    console.log('response not ok 404');
    throw new Error(`Failed to update item. Status: ${response.status}`);
  }
};
