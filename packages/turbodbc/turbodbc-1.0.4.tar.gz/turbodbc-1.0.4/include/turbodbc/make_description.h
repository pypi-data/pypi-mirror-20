#pragma once

#include <cpp_odbc/column_description.h>
#include <turbodbc/description.h>
#include <turbodbc/field.h>
#include <turbodbc/type_code.h>
#include <memory>

namespace turbodbc {

/**
 * @brief Create a buffer description based on a given column description
 */
std::unique_ptr<description const> make_description(cpp_odbc::column_description const & source);

/**
 * @brief Create a buffer description based on the type and content of a value
 */
std::unique_ptr<description const> make_description(field const & value);

/**
 * @brief Create a buffer description based on the type code and type size
 */
std::unique_ptr<description const> make_description(type_code type, std::size_t size);

}
