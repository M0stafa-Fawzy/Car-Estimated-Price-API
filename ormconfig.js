var config = {
    synchronize: false,
    // migrations: ['migrations/*.js'],
    // cli: {
    //     migrationsDir: 'migrations'
    // }
};

switch (process.env.NODE_ENV) {
    case 'dev':
        Object.assign(config, {
            type: 'sqlite',
            database: 'db.sqlite',
            entities: ['**/*.entity.js'],
        });
        break;
    case 'test':
        Object.assign(config, {
            type: 'sqlite',
            database: 'test.sqlite',
            entities: ['**/*.entity.ts'],
        });
        break;
    case 'production':
        break;
    default:
        throw new Error('unknown env');
}

module.exports = config;
