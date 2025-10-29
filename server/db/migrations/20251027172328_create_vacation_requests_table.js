exports.up = function (knex) {
  return knex.schema.createTable('vacation_requests', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.date('start_date').notNullable();
    table.date('end_date').notNullable();
    table.text('reason');
    table.enum('status', ['Pending', 'Approved', 'Rejected']).defaultTo('Pending');
    table.text('comments');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    
    table.index('user_id');
    table.index('status');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('vacation_requests');
};
