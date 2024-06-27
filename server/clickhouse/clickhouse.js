import { ClickHouse } from 'clickhouse';

const clickhouse = new ClickHouse({
    url: 'http://127.0.0.1',
    port: 8123,
    debug: false,
    basicAuth: null,
    isUseGzip: false,
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