(module
    ;; (import "env" "fetch" (func $env_fetch (param $file_path i32) (result i32)))
    (import "env" "log" (func $env_log (param $text externref)))

    (func $compile (param $script_text externref) (result i32)
        (local.get $script_text)
        (call $env_log)
        (i32.const 11)
    )

    (export "compile" (func $compile))
)