exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(() => {
    return Promise.all([
      // Inserts seed entries
      knex('users').insert({
        username: 'michael',
        detail: 'michael@mherman.org'
      }),
      knex('users').insert({
        username: 'michaeltwo',
        detail: 'michael@realpython.org'
      })
    ]);
  });
};
