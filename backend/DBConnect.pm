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

sub insert_api_name{
    my $sth = $dbh->prepare("INSERT INTO ADDAPI
                            (API_NAME)
                            values
                            (?)");
    my $rv=$sth->execute(@_) 
            or die $DBI::errstr;
    if(! defined $rv) {print "OOPs! row cannot be inserted.\n";}
    else {print "Row added successfully.\n";}
    $sth->finish();
}

sub fetch_api_name{
    my $sth = $dbh->prepare("SELECT * FROM ADDAPI");  
    $sth->execute() or die $DBI::errstr;  
    while (my @row = $sth->fetchrow_array()) {  
       my ($API_ID,$API_NAME) = @row;  
        print "API_ID = $API_ID, API_NAME = $API_NAME\n";
    # return $API_ID,$API_NAME;  
    }  
    $sth->finish();
}

sub insert_api_url{
    my ($API_NAME, $API_URL) = @_;

    #Fetch API_ID based on API_NAME
    my $sth_select = $dbh->prepare("SELECT API_ID FROM ADDAPI WHERE API_NAME = ?");
    $sth_select->execute($API_NAME) or die $dbh->errstr;
    my ($API_ID) = $sth_select->fetchrow_array;
    $sth_select->finish();

    #Insert API_ID and API_URL into ADDAPI_URL table.
    my $sth_insert = $dbh->prepare("INSERT INTO ADDAPI_URL
                            (API_ID,API_URL)
                            values
                            (?,?)");
    my $rv=$sth_insert->execute($API_ID,$API_URL) or die $dbh->errstr; 
            # or die $DBI::errstr;
    if(! defined $rv) {print "OOPs! row cannot be inserted.\n";}
    else {print "Row added successfully.\n";}
    $sth_insert->finish();
}

sub fetch_api_url{
    my $sth = $dbh->prepare("SELECT * FROM ADDAPI_URL");  
    $sth->execute() or die $DBI::errstr;  
    while (my @row = $sth->fetchrow_array()) {  
       my ($URL_ID,$API_ID,$API_URL) = @row;  
        print "URL_ID = $URL_ID, API_ID = $API_ID, API_URL = $API_URL\n";  
   # return $URL_ID,$API_ID,$API_URL;
    }  
    $sth->finish();
}

sub insert_validation{

}
1;