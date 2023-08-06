/**
 * @file xzstream.h
 * @author Chase Geigle
 *
 * All files in META are dual-licensed under the MIT and NCSA licenses. For more
 * details, consult the file LICENSE.mit and LICENSE.ncsa in the root of the
 * project.
 */

#ifndef META_UTIL_XZSTREAM_H_
#define META_UTIL_XZSTREAM_H_

#include <lzma.h>

#include <cstdio>
#include <istream>
#include <ostream>
#include <streambuf>
#include <vector>

#include "meta/config.h"

namespace meta
{
namespace io
{

class xz_exception : public std::runtime_error
{
  public:
    xz_exception(const std::string& msg, lzma_ret code)
        : std::runtime_error{msg}, code_{code}
    {
        // nothing
    }

    explicit operator lzma_ret() const
    {
        return code_;
    }

  private:
    lzma_ret code_;
};

class xzstreambuf : public std::streambuf
{
  public:
    xzstreambuf(const char* filename, const char* openmode,
                std::size_t buffer_size = 128 * 1024);

    ~xzstreambuf();

    int_type underflow() override;

    int_type overflow(int_type ch) override;

    int sync() override;

    bool is_open() const;

    uint64_t bytes_read() const;

  private:
    bool reading_;
    std::vector<char> in_buffer_;
    std::vector<char> out_buffer_;
    FILE* file_;
    uint64_t bytes_read_;
    lzma_stream stream_;
    lzma_action action_;
};

class xzifstream : public std::istream
{
  public:
    explicit xzifstream(std::string name);

    xzstreambuf* rdbuf() const;

    void flush();

    uint64_t bytes_read() const;

  private:
    xzstreambuf buffer_;
};

class xzofstream : public std::ostream
{
  public:
    explicit xzofstream(std::string name);

    xzstreambuf* rdbuf() const;

    void flush();

  private:
    xzstreambuf buffer_;
};
}
}
#endif
