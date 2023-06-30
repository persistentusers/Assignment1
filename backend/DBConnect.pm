package DBConnect;

use strict;
use warnings;
use DBI;  

use Exporter;
our @ISA = qw(Exporter);

my $dbh;

sub connect{
    my $driver = "mysql";  
    my $database = "apimonitoring";  
    my $dsn      = "dbi:$driver:database=$database";  
    my $user     = "root";  
    my $password = "123456789";  
    $dbh = DBI->connect($dsn, $user, $password) or die $DBI::errstr;  
    return $dbh;
}

sub insert{
    my $sth = $dbh->prepare("INSERT INTO addapi
                            (API_Name,API_Request,API_URL)
                            values
                            (?,?,?)");
    my $rv=$sth->execute(@_) 
            or die $DBI::errstr;
    if(! defined $rv) {print "OOPs! row cannot be inserted.\n";}
    else {print "Row added successfully.\n";}
    $sth->finish();
}

sub fetch{
    my $sth = $dbh->prepare("SELECT * FROM addapi");  
    $sth->execute() or die $DBI::errstr;  
    while (my @row = $sth->fetchrow_array()) {  
       my ($Id,$API_Name,$API_Request,$API_URL) = @row;  
       print "Id = $Id, API_Name = $API_Name, API_Request = $API_Request, API_URL = $API_URL\n";  
    }  
    $sth->finish();
}

1;