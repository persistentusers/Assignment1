#!/usr/bin/perl
package SubRoutine;

use strict;
use warnings;
use DBI;  
use JSON;

use Exporter;
our @ISA = qw(Exporter);

my $dbh;

sub connect_db{
    my $driver = "mysql";  
    my $database = "apimonitoring";  
    my $dsn      = "dbi:$driver:database=$database";  
    my $user     = "root";  
    my $password = "123456789";  
    $dbh = DBI->connect($dsn, $user, $password) or die $DBI::errstr;  
    return $dbh;
}

sub insert_api_status{
    my ($URL_ID,$URL_STATUS,$RESPONSE_TIME,$API_ID) = @_;
    my $sth = $dbh->prepare("INSERT INTO ADDAPI_STATUS
                            (URL_ID,URL_STATUS,RESPONSE_TIME,API_ID)
                            values
                            ( ?,?,?,?)");
    my $rv=$sth->execute(@_);
    if(! defined $rv) {print "Faild insertion, Enter Correct URL_ID !";}
    else {print "1";}
    $sth->finish();
}

1;