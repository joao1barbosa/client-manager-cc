<?php

namespace App\Services;

class ApiResponseFormatter
{
    /**
     * Retira o número da pagina de uma url
     *
     * @param string $url
     * @return int|null
     */
    private function extractPageNumber($url)
    {
        if ($url === null) {
            return null;
        }

        $query = parse_url($url, PHP_URL_QUERY);

        parse_str($query, $params);

        return isset($params['page']) ? (int) $params['page'] : null;
    }

    /**
     * Formata a resposta da API antes de enviá-la.
     *
     * @param array $response
     * @return array
     */
    public function format(array $response): array
    {
        $filteredData = array_map(function ($item) {
            return [
                'uuid' => $item['uuid'],
                'nome' => $item['nome'],
                'sobrenome' => $item['sobrenome'],
                'email' => $item['email'],
                'aniversario' => $item['aniversario'],
                'telefone' => $item['telefone']
            ];
        }, $response['data']);

        return [
            'first' => 1,
            'prev' => $this->extractPageNumber($response['prev_page_url']),
            'next' => $this->extractPageNumber($response['next_page_url']),
            'last' => $response['last_page'],
            'page' => $response['current_page'],
            'pages' => $response['last_page'],
            'items' => $response['total'],
            'data' => $filteredData,
        ];
    }
}
