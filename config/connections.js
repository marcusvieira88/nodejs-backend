class Config {
  /**
   * Represent the database configuration
   */
  static getDatabaseConfig() {
    return {
      LOCAL: 'local',
      DEVELOPMENT: 'development',
      STAGING: 'staging',
      PRODUCTION: 'production',
      environment: {
        'local': {config: 'mongodb://localhost:27017/adviqo-local'},
        'development': {config: 'mongodb://localhost:27017/adviqo-develop'},
        'staging': {config: 'mongodb://localhost:27017/adviqo-staging'},
        'production': {config: 'mongodb://localhost:27017/adviqo-production'}
      }
    };
  }

  /**
   * Represent the database cache configuration
   */
  static CacheConfig() {
    return {
      LOCAL: 'local',
      DEVELOPMENT: 'development',
      STAGING: 'staging',
      PRODUCTION: 'production',
      environment: {
        'local': {host: 'localhost', port:'6379'},
        'development': {host: 'development', port:'6379'},
        'staging': {host: 'staging', port:'6379'},
        'production': {host: 'production', port:'6379'}
      }
    };
  }
}

module.exports = Config;

