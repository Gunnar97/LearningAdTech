import { ClickHouse } from 'clickhouse';

const clickhouse = new ClickHouse({
    url: process.env.CLICKHOUSE_URL,
    port: process.env.CLICKHOUSE_PORT,
    debug: false,
    basicAuth: null,
    isUseGzip: true,
    format: "json",
    raw: false,
    config: {
        session_id: 'session_id if needed',
        session_timeout: 60,
        output_format_json_quote_64bit_integers: 0,
        enable_http_compression: 0,
        database: 'default',
    },
});

export default clickhouse;